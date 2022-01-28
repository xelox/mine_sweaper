console.log('hello world');

const START_BTN = $('#start_btn');

class Field
{
    constructor(size)
    {
        //we define mine field object's properties...
        this.SIZE = size;
        this.rows = []; //this are the rows in the field
        this.field = $('#field');
        $(this.field).html(''); // reset the field
        this.field_virtual = []; //the array containing actual information about the state of boxes in the field;

        for(let i = 0; i < this.SIZE * this.SIZE; i++) //this loop generates all the states for the virual field
        {
            const hasBomb = Math.random() < 0.15;
            this.field_virtual.push({hasBomb: hasBomb, flipped: false, neighboring: 0}); //here we insert the stat in the virtual field
        }
       
        for(let i = 0; i < this.SIZE; i++) //this forloop generates rows
        {
            const row = document.createElement('div');
            $(row).addClass('row');
            $(this.field).append(row);
            this.rows.push(row);

            for(let j = 0; j < this.SIZE; j++) //and this one generates boxes in rows
            {
                const hasBomb = this.field_virtual[j * this.SIZE + i].hasBomb;
                const bombsCount = this.countNerbyBombs(i, j);
                const box = document.createElement('div');
                $(box).addClass('box');
                $(box).attr('x', i);
                $(box).attr('y', j);
                let html = '<span class=box_cover></span>';
                if(hasBomb)
                    html+='<span>💣</span>';
                else if(bombsCount > 0)
                    html+=`<span>${bombsCount}</span>`;
                this.field_virtual[j * this.SIZE + i].neighboring = bombsCount;
                $(box).html(html);
                $(row).append(box);


                $(box).click(() => this.solveBoxClick(box));

                $(row).append(box);
            }
        }

    }

    countNerbyBombs(x, y)
    {
        //### this sets starting points and makes sure those starting points are not outside of the array bountry;
        let xStart = x - 1;     xStart = (xStart >= 0) ? xStart : 0;
        let xEnd = x + 1;       xEnd = (xEnd < this.SIZE) ? xEnd : this.SIZE - 1;
        let yStart = y - 1;     yStart = (yStart >= 0) ? yStart : 0;
        let yEnd = y + 1;       yEnd = (yEnd < this.SIZE) ? yEnd : this.SIZE - 1;
        //### 

        let count = 0;
        for(let i = xStart; i <= xEnd; i++)
        {
            for(let j = yStart; j <= yEnd; j++)
            {
                //if(!(i == x && j == y)) //truty if it is a box other than the one we are inspecting
                {
                    if(this.field_virtual[j * this.SIZE + i].hasBomb) count++;
                }
            }
        }

        return count;
    }

    solveBoxClick(box)
    {
        $($(box).find('.box_cover')).css('display', 'none');
        const x = Number($(box).attr('x'));
        const y = Number($(box).attr('y'));

        if(
             this.field_virtual[y * this.SIZE + x].neighboring == 0 && 
            !this.field_virtual[y * this.SIZE + x].flipped
        )
        {
            this.field_virtual[y * this.SIZE + x].flipped = true;
            //### this sets starting points and makes sure those starting points are not outside of the array bountry;
            let xStart = x - 1;     xStart = (xStart >= 0) ? xStart : 0;
            let xEnd = x + 1;       xEnd = (xEnd < this.SIZE) ? xEnd : this.SIZE - 1;
            let yStart = y - 1;     yStart = (yStart >= 0) ? yStart : 0;
            let yEnd = y + 1;       yEnd = (yEnd < this.SIZE) ? yEnd : this.SIZE - 1;
            //### 

            for(let i = xStart; i <= xEnd; i++)
            {
                for(let j = yStart; j <= yEnd; j++)
                {
                    if(!(i == x && j == y)) //truty if it is a box other than the one we are inspecting
                    {
                        const row = this.rows[i];
                        const boxy = $(row).children()[j];
                        this.solveBoxClick(boxy);
                    }
                }
            }
        }

    }
}

let field = new Field(10);
$('#size_slider').on('input', function()
{
    const size = $(this).val();
    field = new Field(size);
})
