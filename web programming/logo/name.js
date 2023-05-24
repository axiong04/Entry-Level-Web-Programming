      var cnv = document.getElementById('naming');
      var ctx = cnv.getContext('2d');

      ctx.fillStyle = "#747C92";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#A1E8AF'; //  color
      var font = canvas.height*.1;
      ctx.font = font + "px Courier New";
    
      ctx.fillText("EXO", canvas.height*.12, canvas.height/2);//text
      ctx.fillStyle = '#A9DEF9';
      ctx.fillText("CUBE", canvas.height*.31, canvas.height/2);//also text

      ctx.beginPath(); 
      ctx.strokeStyle ='#747C92'; // sets color
      ctx.lineWidth = ''+canvas.height/100; // sets width
      ctx.moveTo(canvas.height*0.27, canvas.height*.55); // sets starting point
      ctx.lineTo(canvas.height*0.27, canvas.height*.3); // sets endpoint
      ctx.stroke(); // draws line
      ctx.closePath(); // Ends element

      ctx.beginPath(); 
      ctx.strokeStyle ='#747C92'; // sets color
      ctx.lineWidth = ''+canvas.height/100; // sets width
      ctx.moveTo(canvas.height*0.3, canvas.height*0.472); // sets starting point
      ctx.lineTo(canvas.height*0.35, canvas.height*0.472); // sets endpoint
      ctx.stroke(); // draws line
      ctx.closePath(); // Ends element