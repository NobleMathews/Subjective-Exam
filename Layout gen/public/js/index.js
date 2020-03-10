mcanvas=$('#canvas')[0];
mdraw=mcanvas.getContext("2d");
// var img = new Image();
var nofit=[];

// img.src = 'seam.png';
// img.onload = function(){
//   // create pattern
//   var ptrn = mdraw.createPattern(img, 'repeat'); // Create a pattern with this image, and set it to "repeat".
//   mdraw.fillStyle = ptrn;
//   mdraw.fillRect(0, 0, mcanvas.width, mcanvas.height); // context.fillRect(x, y, width, height);
// }

// run();
function run(typ){
    var blocks = [
        { w: 600, h: 600 },
        { w:  600, h:  300 },
        { w:  300, h: 300 },
        { w: 600, h: 150 },
        { w: 300, h: 150 },
        { w: 600, h: 600 },
        { w:  600, h:  300 },
        { w:  300, h: 300 },
        { w: 600, h: 150 },
        { w: 300, h: 150 },
        { w: 600, h: 600 },
        { w:  600, h:  300 },
        { w:  300, h: 300 },
        { w: 600, h: 150 },
        { w: 300, h: 150 }          
      ];
    packer=new Mosaic();
    packer.answersheet(blocks);
    mcanvas.width=packer.currPos.w+1;
    mcanvas.height=packer.currPos.h+1;
    mdraw.clearRect(0, 0,mcanvas.width,mcanvas.height);
    boundary(packer.currPos);

    for (var x = 0 ; x < blocks.length ; x++) {
        var block = blocks[x];
        if (block.fit){
            mdraw.font = "30px Arial";
            mdraw.fillStyle=color(x);
            // mdraw.fillRect(block.fit.x + 0.5, block.fit.y + 0.5, block.w, block.h);
            mdraw.fillText(x+1, block.fit.x + 5, block.fit.y + 30);

        }
        else
        // nofit.push("" + block.w + "x" + block.h);
        nofit.push([block.w,block.h]);

      }
      if(nofit.length>0){
        //use the nofit elements and restart
      }
}
function stroke(x, y, w, h) {
      mdraw.strokeStyle = "#000";
      mdraw.lineWidth = 3;
      mdraw.strokeRect(x + 0.5, y + 0.5, w, h);
    }
function boundary(node) {
      if (node) {
        stroke(node.x, node.y, node.w, node.h);
        boundary(node.down);
        boundary(node.right);
      }
    }
function color(n) {
    // var clr = [ "#FFF7A5", "#FFA5E0", "#A5B3FF", "#BFFFA5", "#FFCBA5" ];
    // return clr[n % cols.length];
    return "black";
  }
