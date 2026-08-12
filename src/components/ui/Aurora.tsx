"use client";

import { useEffect, useRef } from 'react';

interface AuroraProps {
  colorStops?: string[];
  amplitude?: number;
  blend?: number;
  speed?: number;
  className?: string;
}

export default function Aurora({
  colorStops = ["#7E8407", "#EAC800", "#254E06"],
  amplitude = 1.0,
  blend = 0.8,
  speed = 1.0,
  className = "",
}: AuroraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Try WebGL2 first, fall back to WebGL1
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    
    if (!gl) {
      console.warn('Aurora: WebGL not supported');
      return;
    }

    console.log('Aurora: WebGL context created');

    // Simple vertex shader
    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment shader with simple aurora effect
    const fragmentShaderSource = `
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec3 u_color1;
      uniform vec3 u_color2;
      uniform vec3 u_color3;
      uniform float u_amplitude;

      // Simple noise function
      float noise(vec2 p) {
        return sin(p.x * 6.28318) * sin(p.y * 6.28318) * 0.5 + 0.5;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        
        // Create flowing waves
        float wave1 = sin(uv.x * 3.0 + u_time * 0.5) * u_amplitude * 0.1;
        float wave2 = sin(uv.x * 2.0 - u_time * 0.7) * u_amplitude * 0.15;
        float wave3 = sin(uv.x * 4.0 + u_time * 0.3) * u_amplitude * 0.08;
        
        float waveIntensity = smoothstep(0.2, 0.8, uv.y + wave1 + wave2 + wave3);
        
        // Color mixing based on position and time
        vec3 color = mix(u_color1, u_color2, uv.x);
        color = mix(color, u_color3, sin(u_time * 0.5) * 0.3 + 0.5);
        
        // Add some noise
        float noiseValue = noise(uv * 5.0 + u_time * 0.1) * 0.1;
        waveIntensity += noiseValue;
        
        gl_FragColor = vec4(color, waveIntensity * 0.6);
      }
    `;

    // Compile shader
    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Aurora shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      
      return shader;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    
    if (!vertexShader || !fragmentShader) {
      console.error('Aurora: Failed to create shaders');
      return;
    }

    // Create program
    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Aurora program link error:', gl.getProgramInfoLog(program));
      return;
    }

    // Set up geometry (fullscreen triangle)
    const positions = new Float32Array([
      -1, -1,
       3, -1,
      -1,  3
    ]);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    // Get locations
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const color1Location = gl.getUniformLocation(program, 'u_color1');
    const color2Location = gl.getUniformLocation(program, 'u_color2');
    const color3Location = gl.getUniformLocation(program, 'u_color3');
    const amplitudeLocation = gl.getUniformLocation(program, 'u_amplitude');

    // Convert hex colors to RGB
    function hexToRgb(hex: string): [number, number, number] {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255
      ] : [0, 0, 0];
    }

    const colors = colorStops.map(hexToRgb);

    // Setup WebGL state
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    // Resize function
    function resize() {
      if (!canvas) {
        console.warn('Aurora: Canvas reference lost');
        return;
      }
      
      const parent = canvas.parentElement;
      if (!parent) {
        console.warn('Aurora: No parent element found');
        return;
      }
      
      const rect = parent.getBoundingClientRect();
      const width = Math.max(rect.width, 300);
      const height = Math.max(rect.height, 200);
      
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      
      if (gl) {
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
      console.log(`Aurora canvas sized: ${canvas.width}x${canvas.height} (style: ${width}x${height})`);
    }

    // Animation loop
    let animationId: number;
    let startTime = Date.now();
    
    function animate() {
      if (!canvas || !gl) return;
      
      const currentTime = (Date.now() - startTime) * 0.001 * speed;
      
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      
      // Set uniforms
      gl.uniform1f(timeLocation, currentTime);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform3f(color1Location, ...colors[0]);
      gl.uniform3f(color2Location, ...colors[1]);
      gl.uniform3f(color3Location, ...colors[2]);
      gl.uniform1f(amplitudeLocation, amplitude);
      
      // Set up attributes
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
      
      // Draw
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      
      animationId = requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    
    // Initial sizing with a slight delay to ensure parent is rendered
    setTimeout(() => {
      resize();
    }, 100);
    
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [colorStops, amplitude, speed]);

  return (
    <canvas 
      ref={canvasRef}
      className={className}
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none'
      }}
    />
  );
}