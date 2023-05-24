      var cnv = document.getElementById('naming');
      var ctx = cnv.getContext('2d');

      ctx.fillStyle = "#272932";
      ctx.fillRect(0, 0, canvas.width*2, canvas.height);

      ctx.fillStyle = '#A0E7AE'; //  color
      var font = canvas.height*.4;
      ctx.font = font + "px Courier New";
    
      ctx.fillText("EXO", canvas.height*.12, canvas.height*.59);//text
      ctx.fillStyle = '#9ECCE7';
      ctx.fillText("CUBE", canvas.height*.89, canvas.height*.59);//also text

      ctx.beginPath(); 
      ctx.strokeStyle ='#272932'; // sets color
      ctx.lineWidth = ''+canvas.height/25; // sets width
      ctx.moveTo(canvas.height*0.72, canvas.height*.70); // sets starting point
      ctx.lineTo(canvas.height*0.72, canvas.height*.3); // sets endpoint
      ctx.stroke(); // draws line
      ctx.closePath(); // Ends element

      ctx.beginPath(); 
      ctx.strokeStyle ='#272932'; // sets color
      ctx.lineWidth = ''+canvas.height/25; // sets width
      ctx.moveTo(canvas.height*0.9, canvas.height*0.472); // sets starting point
      ctx.lineTo(canvas.height*0.95, canvas.height*0.472); // sets endpoint
      ctx.stroke(); // draws line
      ctx.closePath(); // Ends element