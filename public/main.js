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
       
        for(let i = 0; i < this.SIZE; i++)
        {
            const row = document.createElement('div');
            $(row).addClass('row');
            $(this.field).append(row);
            this.rows.push(row);

            for(let j = 0; j < this.SIZE; j++)
            {
                const box = document.createElement('div');
                $(box).addClass('box');
                $(row).append(box);
                this.rows.push(box);
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
