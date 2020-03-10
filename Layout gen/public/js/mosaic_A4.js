class Mosaic{
    constructor(){
        this.currPos={ x: 0, y: 0, w: 1000, h: 1414}
    }
    // constructor(wi,he){
    //     this.currPos = { x: 0, y: 0, w: wi, h: he };
    // }
    answersheet(ans){
        var pos;
        for(let i=0;i<ans.length;i++){
            var q=ans[i];
            if(pos=this.findPos(this.currPos,q.w,q.h))
                q.fit=this.setupPos(pos,q.w,q.h);
                

        }
    }
    findPos(cpos,w,h){
        if(cpos.used)
            return this.findPos(cpos.right,w,h)||this.findPos(cpos.down,w,h);
        else if((w<=cpos.w)&& (h <= cpos.h))
            return cpos;
        else
            return null;
    }
    setupPos(pos,w,h){
        pos.used=true;
        pos.right={
            x:pos.x+w,
            y:pos.y,
            w:pos.w-w,
            h:h
        };
        pos.down={
            x:pos.x,
            y:pos.y+h,
            w:pos.w,
            h:pos.h-h
        };
        return pos;
    }


}