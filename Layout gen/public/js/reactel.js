var allQuestions = new Array();
var status =1;
var typOfBoxes = new Array(7);
var blocks = [
  // { w: 600, h: 600 },
  // { w:  600, h:  300 },
  // { w:  300, h: 300 },
  // { w: 600, h: 150 },
  // { w: 300, h: 150 },
  // { w: 600, h: 600 },
  // { w:  600, h:  300 },
  // { w:  300, h: 300 },
  // { w: 600, h: 150 },
  // { w: 300, h: 150 },
  // { w: 600, h: 600 },
  // { w:  600, h:  300 },
  // { w:  300, h: 300 },
  // { w: 600, h: 150 },
  // { w: 300, h: 150 }          
];
var listss=[];

var ListItem = React.createClass({ displayName: "ListItem",
  getInitialState: function () {
    return { name: this.props.value.name,weight:this.props.value.weight, gstring: this.props.value.gstring, checked: this.props.value.checked };
  },

  render: function () {
    return (
      React.createElement("tr", null,
      React.createElement("td", { className: "checkTd" }, React.createElement("div", { className: "flexcenter" }, React.createElement("input", { type: "checkbox", name: "checked", id: "c" + this.props.value.id, checked: this.state.checked, onChange: this.handleChange }), React.createElement("label", { htmlFor: "c" + this.props.value.id }, React.createElement("span", null)))),
      React.createElement("td", null, React.createElement("input", { type: "text", name: "name", value: this.state.name, onChange: this.handleChange, placeholder: "Question..." })),
      // React.createElement("td", null,React.createElement("select", {type: "text", name: "weightage", onChange: this.handleChange.bind(this)},
      //   React.createElement("option", {value: 1}, "1 mark"),
      //   React.createElement("option", {value: 2}, "2 mark"),
      //   React.createElement("option", {value: 3}, "3 mark"),
      //   React.createElement("option", {value: 4}, "4 mark"),
      //   React.createElement("option", {value: 5}, "5 mark"),
      //   React.createElement("option", {value: 6}, "6 mark"))),
      React.createElement("td", null, React.createElement("input", { type: "number", name: "weight", value: this.state.weight, onChange: this.handleChange, placeholder: "Marks..." })),
      // React.createElement("td", null, React.createElement("textarea", { name: "splitm",value:this.state.gstring,  onChange: this.handleChange, placeholder: "Mark Splitup Comments" }))
      React.createElement("td", null, React.createElement("textarea", { name: "gstring",value:this.state.gstring, onChange: this.handleChange, placeholder: "Mark Splitup Comments" }))

      ));


  },

  handleChange: function (event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    // if(name=="splitm"){
    //   console.log(value);
    // }
     

    if(name=="weight"){
    if(value>0 && value<=6)
      {this.setState({
        [name]: value });}
    }
    else{
    this.setState({
      [name]: value },
    this.calcoloTotale);
    }
    
  },

  componentDidMount: function () {
    var finalValue = 0;

    if (this.state.checked) {
      finalValue = this.state.weight * 1.0;   
    } else {
      finalValue = 0;
    }

    allQuestions[this.props.value.id] = finalValue;  
    this.props.updateGlobalTotal();
  },

  calcoloTotale: function () {
    var finalValue = 0;
    listss[this.props.value.id]=this.state;
    console.log(listss); 
    if (this.state.checked) {
      finalValue = this.state.weight * 1.0;

    } else {
      finalValue = 0;
    }

    allQuestions[this.props.value.id] = finalValue;
    this.props.updateGlobalTotal();
  } });



var Table = React.createClass({ displayName: "Table",
  getInitialState: function () {
    return { totale: 0,totals:0, checked: false };
  },

  render: function () {
    return (
      React.createElement("div", null,
      React.createElement("table", null,
      React.createElement("tr", null,
      React.createElement("th", { className: "checkTh" }),
      React.createElement("th", null, "Question"),
      React.createElement("th", null, "Type of box"),
      React.createElement("th", null, "Mark + Comment per line")
      ),


      this.props.items.map((q) =>
      React.createElement(ListItem, { key: q.id, value: q, updateGlobalTotal: this.updateGlobalTotal })),

      React.createElement("tr", { className: "totalTr" },
      React.createElement("td", null),
      React.createElement("td", { className: "totalText" }, "Total Questions : "+status),
      React.createElement("td", { className: "totalTR" }, "Total Marks : "+ this.state.totale),
      React.createElement("td", null)
      ))));




  },

  updateGlobalTotal: function () {
    var total = 0;
    status=0;
    // typOfBoxes=[0,0,0,0,0,0,0];
    blocks=[];    
    for (var i = 0; i < this.props.ids; i++) {
      {total += allQuestions[i];
        if(allQuestions[i]!=0){status++;}
      }
      if(allQuestions[i]!=NaN)
      
      switch (allQuestions[i]){
        case 1:
          blocks.push({w: 300, h: 150});
          break;
        case 2:
          blocks.push({w: 600, h: 150});
          break;
        case 3:
          blocks.push({w: 300, h: 300});
          break;
        case 4:
          blocks.push({w: 600, h: 300});
          break;
        case 5:
          blocks.push({w: 600, h: 600});
          break;
        case 6:
          blocks.push({w: 800, h: 800});
          break;
        
      }
    }
    // console.log(blocks);
    //reupdate blocks based on number of occurences here    
    this.setState({ totale: total });
    // $.getScript("index.js",function(){
    //     run(blocks,1);
    //     });
  } });



var AddNewRow = React.createClass({ displayName: "AddNewRow",
  render: function () {
    return (
      React.createElement("div", null,
      React.createElement("button", { onClick: this.props.onClick }, "+"), "Add Question"));
  } });


var Run = React.createClass({ displayName: "Run",
  render: function () {
    return (
      React.createElement("div", null,
      React.createElement("button", { onClick: this.props.onClick }, "R"), "Run"));



  } });

  var Save = React.createClass({ displayName: "Save",
  render: function () {
    return (
      React.createElement("div", null,
      React.createElement("button", { onClick: this.props.onClick }, "S"), "Save"));



  } });


var Calculator = React.createClass({ displayName: "Calculator",
  getInitialState: function () {
    return {
      counter: this.props.len, lists: this.props.exampleq };

  },

  render: function () {
    return (
      React.createElement("div", { className: "container" },
      React.createElement(Table, { items: this.state.lists, ids: this.state.counter }),
      React.createElement(AddNewRow, { onClick: this.addRow }),
      React.createElement(Run, { onClick: this.runs }),
      React.createElement(Save, { onClick: this.saveStat })
      ));


  },

  addRow: function () {
    this.setState({ counter: this.state.counter + 1 });
    // var listItem = { id: this.state.counter,name:this.state.name,weight:this.state.weight,gstring:this.state.gstring,checked:this.state.checked};
    var listItem = { id: this.state.counter, product: { name: "", weight: "0",gstring:"" } };
    var allItem = this.state.lists.concat([listItem]);
    this.setState({ lists: allItem });
  },

  saveStat: function () {
    // var _this2 = this;
    // $.ajax({
    //   type: "POST",
    //   url: "saveJson.php",
    //   dataType: 'json',
    //   data: { json: _this2.state.lists } });

    var obj=listss;
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
    console.log(obj);
    var anchor = document.getElementById('anchor');
    anchor.setAttribute("href",     dataStr     );
    anchor.setAttribute("download", "MarkingScheme.json");
    anchor.click();


  },
  runs: function(){
    $.getScript("index.js",function(){
      run(blocks,1);
      });
  } 
});



var exampleq = [{ "id": 0, "name": "To be or not to be, that is the question", "weight": "3","gstring":"1 step1\n2 Step2", "checked": true }];
listss[0]={"name": "To be or not to be, that is the question", "weight": "3","gstring":"1 step1\n2 Step2", "checked": true };

ReactDOM.render(
React.createElement(Calculator, { exampleq: exampleq, len: exampleq.length }),
document.getElementById('root'));