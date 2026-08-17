(function (global) {
  var TYPES = ["contour", "maze", "stipple", "radial"];

  var VERT = [
    "attribute vec2 a_pos;",
    "void main() {",
    "  gl_Position = vec4(a_pos, 0.0, 1.0);",
    "}"
  ].join("\n");

  var FRAG = [
    "precision highp float;",
    "uniform vec2 u_res;",
    "uniform float u_time;",
    "uniform vec2 u_mouse;",
    "uniform float u_hasMouse;",
    "uniform float u_type;",
    "uniform float u_seed;",
    "uniform float u_invert;",
    "uniform float u_density;",
    "uniform float u_warp;",
    "uniform float u_speed;",
    "uniform float u_contrast;",

    "vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }",
    "vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }",
    "vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }",

    "float snoise(vec2 v) {",
    "  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);",
    "  vec2 i = floor(v + dot(v, C.yy));",
    "  vec2 x0 = v - i + dot(i, C.xx);",
    "  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);",
    "  vec4 x12 = x0.xyxy + C.xxzz;",
    "  x12.xy -= i1;",
    "  i = mod289(i);",
    "  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));",
    "  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);",
    "  m = m * m;",
    "  m = m * m;",
    "  vec3 x = 2.0 * fract(p * C.www) - 1.0;",
    "  vec3 h = abs(x) - 0.5;",
    "  vec3 ox = floor(x + 0.5);",
    "  vec3 a0 = x - ox;",
    "  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);",
    "  vec3 g;",
    "  g.x = a0.x * x0.x + h.x * x0.y;",
    "  g.yz = a0.yz * x12.xz + h.yz * x12.yw;",
    "  return 130.0 * dot(m, g);",
    "}",

    "float hash(vec2 p) {",
    "  p = fract(p * vec2(123.34, 456.21));",
    "  p += dot(p, p + 45.32);",
    "  return fract(p.x * p.y);",
    "}",

    "vec2 hash2(vec2 p) {",
    "  return vec2(hash(p), hash(p + vec2(17.1, 9.4)));",
    "}",

    "float noise(vec2 p) {",
    "  return snoise(p) * 0.5 + 0.5;",
    "}",

    "float fbm(vec2 p) {",
    "  float v = 0.0;",
    "  float a = 0.5;",
    "  for (int i = 0; i < 5; i++) {",
    "    v += a * noise(p);",
    "    p = p * 2.02 + vec2(1.7, 9.2);",
    "    a *= 0.5;",
    "  }",
    "  return v;",
    "}",

    "float worley(vec2 p) {",
    "  vec2 i = floor(p);",
    "  vec2 f = fract(p);",
    "  float d = 1.0;",
    "  for (int y = -1; y <= 1; y++) {",
    "    for (int x = -1; x <= 1; x++) {",
    "      vec2 g = vec2(float(x), float(y));",
    "      vec2 o = hash2(i + g + u_seed);",
    "      d = min(d, length(f - g - o));",
    "    }",
    "  }",
    "  return d;",
    "}",

    "float isoline(float n, float scale, float width) {",
    "  float x = n * scale;",
    "  return 1.0 - smoothstep(0.0, width, abs(fract(x) - 0.5));",
    "}",

    "float contour(vec2 p, float t) {",
    "  vec2 q = vec2(fbm(p * 1.7 + t * 0.18 + u_seed), fbm(p * 1.7 + 4.2 - t * 0.16 + u_seed));",
    "  vec2 r = vec2(",
    "    fbm(p * 2.1 + 3.8 * q + vec2(1.7, 9.2) + t * 0.1),",
    "    fbm(p * 2.1 + 3.8 * q + vec2(8.3, 2.8) - t * 0.09)",
    "  );",
    "  vec2 warped = p + (q - 0.5) * (0.28 * u_warp) + (r - 0.5) * (0.16 * u_warp);",
    "  float v = 0.0;",
    "  for (int i = 0; i < 8; i++) {",
    "    float fi = float(i);",
    "    float id = fi * 1.618 + u_seed;",
    "    vec2 c = vec2(",
    "      sin(t * (0.06 + fi * 0.01) + id * 2.1) * 0.62,",
    "      cos(t * (0.05 + fi * 0.008) + id * 1.4) * 0.48",
    "    );",
    "    c += 0.18 * vec2(sin(t * 0.04 + id * 3.2), cos(t * 0.045 + id * 2.6));",
    "    float ang = t * (0.022 + fi * 0.004) + id;",
    "    float ca = cos(ang);",
    "    float sa = sin(ang);",
    "    vec2 d = warped - c;",
    "    d = vec2(ca * d.x - sa * d.y, sa * d.x + ca * d.y);",
    "    d.x *= 0.62 + 0.28 * sin(id * 2.4);",
    "    float rad = 0.16 + 0.07 * sin(id * 3.1 + t * 0.1);",
    "    v += (rad * rad) / (dot(d, d) + 0.002);",
    "  }",
    "  if (u_hasMouse > 0.01) {",
    "    vec2 md = warped - u_mouse;",
    "    v += u_hasMouse * 0.11 / (dot(md, md) + 0.018);",
    "  }",
    "  v += 0.18 * (fbm(warped * 3.4 + t * 0.12) - 0.5);",
    "  float ink = max(isoline(v, 5.6 * u_density, 0.1), isoline(v, 10.2 * u_density, 0.09) * 0.22);",
    "  float fill = smoothstep(0.95, 1.35, v) * (1.0 - smoothstep(3.1, 3.9, v));",
    "  float core = smoothstep(2.2, 2.8, v) * (1.0 - smoothstep(3.0, 3.55, v));",
    "  return max(ink, max(fill * 0.28, core * 0.62));",
    "}",

    "float maze(vec2 p, float t) {",
    "  vec2 q = vec2(fbm(p * 1.35 + u_seed + t * 0.12), fbm(p * 1.35 + 5.4 - t * 0.1));",
    "  vec2 w = p + (q - 0.5) * (0.62 * u_warp);",
    "  float n = fbm(w * (2.4 * u_density) + t * 0.08 + u_seed);",
    "  float corridors = 1.0 - smoothstep(0.0, 0.11, abs(sin(n * 20.0)));",
    "  float ridge = 1.0 - abs(n * 2.0 - 1.0);",
    "  return max(corridors, smoothstep(0.52, 0.88, ridge) * 0.32);",
    "}",

    "float stipple(vec2 p, float t) {",
    "  vec2 q = p * (6.2 * u_density) + vec2(t * 0.035, -t * 0.025) + u_seed;",
    "  float d = worley(q);",
    "  float n = fbm(p * 2.1 + u_seed);",
    "  float rad = mix(0.1, 0.4, n);",
    "  float dots = 1.0 - smoothstep(rad * 0.35, rad, d);",
    "  float wash = smoothstep(0.55, 0.2, worley(q * 0.45 + 2.2));",
    "  return max(dots, wash * 0.18);",
    "}",

    "float radial(vec2 p, float t) {",
    "  float ink = 0.0;",
    "  for (int i = 0; i < 3; i++) {",
    "    float fi = float(i);",
    "    vec2 c = vec2(",
    "      sin(u_seed + fi * 2.2 + t * 0.05) * 0.34,",
    "      cos(u_seed * 1.3 + fi * 1.7 - t * 0.04) * 0.26",
    "    );",
    "    vec2 d = p - c;",
    "    float a = atan(d.y, d.x);",
    "    float rad = length(d);",
    "    float wob = fbm(vec2(a * 0.85, rad * 2.1) + t * 0.05 + u_seed) * 1.7 * u_warp;",
    "    float arms = sin(a * (11.0 + fi * 4.0 + u_density * 7.0) + wob + t * 0.14);",
    "    float ring = 1.0 - smoothstep(0.0, 0.14, abs(arms));",
    "    ring *= smoothstep(0.95, 0.12, rad);",
    "    ink = max(ink, ring);",
    "  }",
    "  return ink;",
    "}",

    "void main() {",
    "  vec2 uv = gl_FragCoord.xy / u_res;",
    "  vec2 p = (gl_FragCoord.xy - 0.5 * u_res) / min(u_res.x, u_res.y);",
    "  p.y *= 0.92;",
    "  if (u_hasMouse > 0.01) {",
    "    vec2 md = p - u_mouse;",
    "    float pull = exp(-dot(md, md) * 2.8) * u_hasMouse;",
    "    p += md * pull * 0.22;",
    "  }",
    "  float t = u_time * 0.07 * u_speed;",
    "  float ink = 0.0;",
    "  if (u_type < 0.5) ink = contour(p, t);",
    "  else if (u_type < 1.5) ink = maze(p, t);",
    "  else if (u_type < 2.5) ink = stipple(p, t);",
    "  else ink = radial(p, t);",
    "  ink = pow(clamp(ink, 0.0, 1.0), 1.0 / max(u_contrast, 0.25));",
    "  float edge = smoothstep(0.0, 0.06, uv.x) * smoothstep(1.0, 0.94, uv.x);",
    "  edge *= smoothstep(0.0, 0.06, uv.y) * smoothstep(1.0, 0.9, uv.y);",
    "  ink *= mix(0.62, 1.0, edge);",
    "  vec3 paper = vec3(0.953, 0.937, 0.902);",
    "  vec3 inkc = vec3(0.047, 0.047, 0.047);",
    "  vec3 color = mix(paper, inkc, clamp(ink, 0.0, 1.0));",
    "  if (u_invert > 0.5) color = mix(inkc, paper, clamp(ink, 0.0, 1.0));",
    "  gl_FragColor = vec4(color, 1.0);",
    "}"
  ].join("\n");

  function compile(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(shader) || "Shader compile failed");
    }
    return shader;
  }

  function typeIndex(name) {
    var i = TYPES.indexOf(name);
    return i < 0 ? 0 : i;
  }

  function normalizePreset(preset) {
    preset = preset || {};
    return {
      type: TYPES.indexOf(preset.type) >= 0 ? preset.type : "contour",
      seed: Number(preset.seed) || 1,
      invert: preset.invert ? 1 : 0,
      density: preset.density == null ? 1 : Number(preset.density),
      warp: preset.warp == null ? 1 : Number(preset.warp),
      speed: preset.speed == null ? 1 : Number(preset.speed),
      contrast: preset.contrast == null ? 1 : Number(preset.contrast)
    };
  }

  function InkField(canvas, options) {
    options = options || {};
    var reduced = !!options.reduced;
    var trackMouse = options.trackMouse !== false;
    var pixelRatio = options.pixelRatio || 1.75;
    var preset = normalizePreset(options.preset);

    var gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: true
    }) || canvas.getContext("experimental-webgl", {
      antialias: false,
      alpha: false
    });

    if (!gl) {
      canvas.style.display = "none";
      return {
        setPaused: function () {},
        setPreset: function () {},
        destroy: function () {},
        getPreset: function () { return preset; }
      };
    }

    try {
      var program = gl.createProgram();
      gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
      gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) || "Program link failed");
      }
    } catch (err) {
      console.error("Ink field failed:", err);
      canvas.style.display = "none";
      return {
        setPaused: function () {},
        setPreset: function () {},
        destroy: function () {},
        getPreset: function () { return preset; }
      };
    }

    gl.useProgram(program);
    gl.clearColor(0.953, 0.937, 0.902, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    var uniforms = {
      res: gl.getUniformLocation(program, "u_res"),
      time: gl.getUniformLocation(program, "u_time"),
      mouse: gl.getUniformLocation(program, "u_mouse"),
      hasMouse: gl.getUniformLocation(program, "u_hasMouse"),
      type: gl.getUniformLocation(program, "u_type"),
      seed: gl.getUniformLocation(program, "u_seed"),
      invert: gl.getUniformLocation(program, "u_invert"),
      density: gl.getUniformLocation(program, "u_density"),
      warp: gl.getUniformLocation(program, "u_warp"),
      speed: gl.getUniformLocation(program, "u_speed"),
      contrast: gl.getUniformLocation(program, "u_contrast")
    };

    var paused = false;
    var raf = 0;
    var start = performance.now();
    var mouse = { x: 0, y: 0, on: 0 };
    var target = { x: 0, y: 0, on: 0 };

    function applyPreset() {
      gl.uniform1f(uniforms.type, typeIndex(preset.type));
      gl.uniform1f(uniforms.seed, preset.seed);
      gl.uniform1f(uniforms.invert, preset.invert);
      gl.uniform1f(uniforms.density, preset.density);
      gl.uniform1f(uniforms.warp, preset.warp);
      gl.uniform1f(uniforms.speed, preset.speed);
      gl.uniform1f(uniforms.contrast, preset.contrast);
    }

    function size() {
      var dpi = Math.min(window.devicePixelRatio || 1, pixelRatio);
      var w = Math.max(1, canvas.clientWidth);
      var h = Math.max(1, canvas.clientHeight);
      var pw = Math.max(1, Math.floor(w * dpi));
      var ph = Math.max(1, Math.floor(h * dpi));
      if (canvas.width !== pw || canvas.height !== ph) {
        canvas.width = pw;
        canvas.height = ph;
      }
      gl.viewport(0, 0, pw, ph);
      gl.uniform2f(uniforms.res, pw, ph);
    }

    function toField(clientX, clientY, rect) {
      var x = (clientX - rect.left) / rect.width;
      var y = (clientY - rect.top) / rect.height;
      var aspect = rect.width / rect.height;
      var px = (x - 0.5) * (aspect > 1 ? aspect : 1);
      var py = (0.5 - y) * (aspect > 1 ? 1 : 1 / aspect);
      return { x: px, y: py * 0.92 };
    }

    function onMove(event) {
      var point = event.touches ? event.touches[0] : event;
      if (!point) return;
      var rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      if (
        point.clientX < rect.left ||
        point.clientX > rect.right ||
        point.clientY < rect.top ||
        point.clientY > rect.bottom
      ) {
        target.on = 0;
        return;
      }
      var next = toField(point.clientX, point.clientY, rect);
      target.x = next.x;
      target.y = next.y;
      target.on = 1;
    }

    function onLeave() {
      target.on = 0;
    }

    function draw(now) {
      size();
      applyPreset();
      mouse.on += (target.on - mouse.on) * 0.12;
      if (target.on) {
        mouse.x += (target.x - mouse.x) * 0.14;
        mouse.y += (target.y - mouse.y) * 0.14;
      }
      if (mouse.on < 0.02 && !target.on) mouse.on = 0;

      var t = reduced ? 12 : (now - start) / 1000;
      gl.uniform1f(uniforms.time, t);
      gl.uniform2f(uniforms.mouse, mouse.x, mouse.y);
      gl.uniform1f(uniforms.hasMouse, mouse.on);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (!reduced && !paused) {
        raf = requestAnimationFrame(draw);
      }
    }

    size();
    applyPreset();
    draw(performance.now());

    if (trackMouse) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerleave", onLeave, { passive: true });
    }
    window.addEventListener("resize", size);

    return {
      setPaused: function (value) {
        paused = !!value;
        if (!paused && !reduced && !raf) raf = requestAnimationFrame(draw);
        if (paused && raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      setPreset: function (next) {
        preset = normalizePreset(next);
        if (reduced || paused) draw(performance.now());
      },
      getPreset: function () {
        return normalizePreset(preset);
      },
      destroy: function () {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", size);
        if (trackMouse) {
          window.removeEventListener("pointermove", onMove);
          window.removeEventListener("pointerleave", onLeave);
        }
      }
    };
  }

  global.InkTypes = TYPES;
  global.InkPreset = { normalize: normalizePreset };
  global.InkField = InkField;
})(window);
