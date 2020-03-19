mcanvas=$('#canvas')[0];
mdraw=mcanvas.getContext("2d");

var nofit=[];
var blocks;
var nu=1;
var carry=0;
var qc=1;
var linebreak = document.createElement("br");
var download=document.getElementById("download");
var lastrun=1;

// var img = new Image();
// img.src = 'seam.png';
// img.onload = function(){
//   // create pattern
//   var ptrn = mdraw.createPattern(img, 'repeat'); // Create a pattern with this image, and set it to "repeat".
//   mdraw.fillStyle = ptrn;
//   mdraw.fillRect(0, 0, mcanvas.width, mcanvas.height); // context.fillRect(x, y, width, height);
// }

// run();
function run(typ,runtyp){
  if(runtyp==1){
    let canvases =Array.from(document.getElementsByTagName("canvas"));
    canvases.forEach(canvas => {
    //   eraser=canvas.getContext("2d");
    //   eraser.fillStyle="#FFFFFF";
    // eraser.fillRect(0 , 0 , mcanvas.width, mcanvas.height);
    if(canvas.id!="canvas"){
      canvas.parentNode.removeChild(canvas);
    }
   
    });
    carry=0;
    mcanvas=$('#canvas')[0];
    mdraw=mcanvas.getContext("2d");
    nu=1;
  }
  if(carry==0)
    qc=1;
  else qc= carry;
  nofit=[];
  blocks=typ;
    
    packer=new Mosaic();
    packer.answersheet(blocks);
    mcanvas.width=packer.currPos.w+1;
    mcanvas.height=packer.currPos.h+1;
    mdraw.clearRect(0, 0,mcanvas.width,mcanvas.height);
    mdraw.fillStyle="#FFFFFF";
    mdraw.fillRect(0 , 0 , mcanvas.width, mcanvas.height);
    boundary(packer.currPos);

    for (var x = 0 ; x < blocks.length ; x++) {
        var block = blocks[x];
        if (block.fit){
            mdraw.font = "30px Arial";
            mdraw.fillStyle=color(x);
            // mdraw.fillRect(block.fit.x + 0.5, block.fit.y + 0.5, block.w, block.h);
            mdraw.fillText(qc++, block.fit.x + 5, block.fit.y + 30);

        }
        else
        nofit.push("" + block.w + "x" + block.h);
        // nofit.push([block.w,block.h]);

      }
      if(nofit.length!=0){
        run(reprocess(nofit),0);

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
function reprocess(blocks) {
    carry=qc;
    var i, j, block, result = [];
    for(i = 0 ; i < blocks.length ; i++) {
      block = blocks[i].split("x");
      if (block.length >= 2)
        result.push({w: parseInt(block[0]), h: parseInt(block[1]), num: (block.length == 2 ? 1 : parseInt(block[2])) });
    }
    var expanded = [];
    for(i = 0 ; i < result.length ; i++) {
      for(j = 0 ; j < result[i].num ; j++)
        expanded.push({w: result[i].w, h: result[i].h});}
        var canvas = document.getElementById("canvas"+nu);
        if(canvas == null)
        {canvas = document.createElement('canvas');
          
          canvas.id = "canvas"+nu;
          nu=nu+1;
          canvas.width = 1000;
          canvas.height = 1414;
          canvas.style.position = "relative";
          canvas.style.border = "1px solid";
          
        document.body.appendChild(canvas);
        document.body.appendChild(linebreak);
        // document.body.appendChild(canvas);
      }
    mcanvas=canvas;
    mdraw=canvas.getContext("2d");
    return expanded;
  }
  download.addEventListener("click", function() {
    let i=0;
    var pdf = new jsPDF('p', 'px', [1415, 1001]);
    let canvases =Array.from(document.getElementsByTagName("canvas"));
    canvases.forEach(canvas => {
      if (i > 0) {
        pdf.addPage(); 
    }
    pdf.setPage(i+1);
      let imgData = canvas.toDataURL("image/jpeg", 1.0);
      pdf.addImage(imgData, 'JPEG', 0, 0,1001,1415);
      i++;
    });
    pdf.save("download.pdf");
  },false);
