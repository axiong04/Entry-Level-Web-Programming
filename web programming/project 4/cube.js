   var canvas = document.getElementById('logo');
   var gl = canvas.getContext('experimental-webgl');



         var vertices = [
            -1,-1,-1, 1,-1,-1, 1, 1,-1, -1, 1,-1,
            -1,-1, 1, 1,-1, 1, 1, 1, 1, -1, 1, 1,
            -1,-1,-1, -1, 1,-1, -1, 1, 1, -1,-1, 1,
            1,-1,-1, 1, 1,-1, 1, 1, 1, 1,-1, 1,
            -1,-1,-1, -1,-1, 1, 1,-1, 1, 1,-1,-1,
            -1, 1,-1, -1, 1, 1, 1, 1, 1, 1, 1,-1, 
         ];

         var colors = [
            1,.64,0, 1,.64,0, 1,.64,0, 1,.64,0,//orang
            1,0,0, 1,0,0, 1,0,0, 1,0,0,//red
            0,1,0, 0,1,0, 0,1,0, 0,1,0,//gren
            0,0,1, 0,0,1, 0,0,1, 0,0,1, //blue
            1,1,0, 1,1,0, 1,1,0, 1,1,0,//yelow
            1,1,1, 1,1,1, 1,1,1, 1,1,1,//white
         ];

         var indices = [
            0,1,2, 0,2,3, 4,5,6, 4,6,7,
            8,9,10, 8,10,11, 12,13,14, 12,14,15,
            16,17,18, 16,18,19, 20,21,22, 20,22,23 
         ];

         // Create and store data into vertex buffer
         var vertex_buffer = gl.createBuffer ();
         gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

         // Create and store data into color buffer
         var color_buffer = gl.createBuffer ();
         gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

         // Create and store data into index buffer
         var index_buffer = gl.createBuffer ();
         gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
         gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

         var vertCode = 'attribute vec3 position;'+
            'uniform mat4 Pmatrix;'+
            'uniform mat4 Vmatrix;'+
            'uniform mat4 Mmatrix;'+
            'attribute vec3 color;'+
            'varying vec3 vColor;'+

            'void main(void) { '+//pre-built function
               'gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(position, 1.);'+
               'vColor = color;'+
            '}';

         var fragCode = 'precision mediump float;'+
            'varying vec3 vColor;'+
            'void main(void) {'+
               'gl_FragColor = vec4(vColor, 1.);'+
            '}';

         var vertShader = gl.createShader(gl.VERTEX_SHADER);
         gl.shaderSource(vertShader, vertCode);
         gl.compileShader(vertShader);

         var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
         gl.shaderSource(fragShader, fragCode);
         gl.compileShader(fragShader);

         var shaderProgram = gl.createProgram();
         gl.attachShader(shaderProgram, vertShader);
         gl.attachShader(shaderProgram, fragShader);
         gl.linkProgram(shaderProgram);

         var Pmatrix = gl.getUniformLocation(shaderProgram, "Pmatrix");
         var Vmatrix = gl.getUniformLocation(shaderProgram, "Vmatrix");
         var Mmatrix = gl.getUniformLocation(shaderProgram, "Mmatrix");

         gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
         var position = gl.getAttribLocation(shaderProgram, "position");
         gl.vertexAttribPointer(position, 3, gl.FLOAT, false,0,0) ;

         // Position
         gl.enableVertexAttribArray(position);
         gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
         var color = gl.getAttribLocation(shaderProgram, "color");
         gl.vertexAttribPointer(color, 3, gl.FLOAT, false,0,0) ;

         // Color
         gl.enableVertexAttribArray(color);
         gl.useProgram(shaderProgram);


         function get_projection(angle, a, zMin, zMax) {
            var ang = Math.tan((angle*.5)*Math.PI/180);//angle*.5
            return [
               0.5/ang, 0 , 0, 0,
               0, 0.5*a/ang, 0, 0,
               0, 0, -(zMax+zMin)/(zMax-zMin), -1,
               0, 0, (-2*zMax*zMin)/(zMax-zMin), 0 
            ];
         }

         var proj_matrix = get_projection(20, canvas.width/canvas.height, 1, 50);

         var mov_matrix = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
         var view_matrix = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];

         // translating z
         view_matrix[14] = view_matrix[14]-6;//zoom


         function rotateZ(m, angle) {
            var c = Math.cos(angle);
            var s = Math.sin(angle);
            var mv0 = m[0], mv4 = m[4], mv8 = m[8];

            m[0] = c*m[0]-s*m[1];
            m[4] = c*m[4]-s*m[5];
            m[8] = c*m[8]-s*m[9];

            m[1]=c*m[1]+s*mv0;
            m[5]=c*m[5]+s*mv4;
            m[9]=c*m[9]+s*mv8;
         }

         function rotateX(m, angle) {
            var c = Math.cos(angle);
            var s = Math.sin(angle);
            var mv1 = m[1], mv5 = m[5], mv9 = m[9];

            m[1] = m[1]*c-m[2]*s;
            m[5] = m[5]*c-m[6]*s;
            m[9] = m[9]*c-m[10]*s;

            m[2] = m[2]*c+mv1*s;
            m[6] = m[6]*c+mv5*s;
            m[10] = m[10]*c+mv9*s;
         }

         function rotateY(m, angle) {
            var c = Math.cos(angle);
            var s = Math.sin(angle);
            var mv0 = m[0], mv4 = m[4], mv8 = m[8];

            m[0] = c*m[0]+s*m[2];
            m[4] = c*m[4]+s*m[6];
            m[8] = c*m[8]+s*m[10];

            m[2] = c*m[2]-s*mv0;
            m[6] = c*m[6]-s*mv4;
            m[10] = c*m[10]-s*mv8;
         }

         //draw
         var time_old = 0;

         var animate = function(time) {

            var dt = time-time_old;
            rotateZ(mov_matrix, dt*0.001);//time
            rotateY(mov_matrix, dt*0.001);
            rotateX(mov_matrix, dt*0.001);
            time_old = time;

            gl.enable(gl.DEPTH_TEST);
            gl.depthFunc(gl.LEQUAL);
            gl.clearColor(0.1529411765, 0.1607843137, 0.1960784314, 1.0);
            gl.clearDepth(1.0);

            gl.viewport(0.0, 0.0, canvas.width, canvas.height);
            gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );//https://stackoverflow.com/questions/30300907/webgl-glsl-how-to-set-background-color-of-embedded-x-shader-x-fragment
            gl.uniformMatrix4fv(Pmatrix, false, proj_matrix);
            gl.uniformMatrix4fv(Vmatrix, false, view_matrix);
            gl.uniformMatrix4fv(Mmatrix, false, mov_matrix);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
            gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);


            window.requestAnimationFrame(animate);
         }
         animate(0);

     
