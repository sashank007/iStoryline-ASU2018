import { Component, ViewEncapsulation, OnInit, Input } from "@angular/core";

import * as d3 from "d3-selection";
import * as d3Scale from "d3-scale";
import * as d3ScaleChromatic from "d3-scale-chromatic";
import * as d3Shape from "d3-shape";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";

import { LRRH } from "../../../shared";
import { BB } from "../../../shared";
import { BBReal } from "../../../shared";

@Component({
  selector: "line-chart",
  encapsulation: ViewEncapsulation.None,
  templateUrl: "./multi-series.component.html",
  styleUrls: ["./multi-series.component.css"]
})
export class MultiLineChartComponent implements OnInit {
  // title = "Little Red Riding Hood";
  private _newColor: string;
  private _newGradient1: string;
  private _newGradient2:string;
  private _newCharacter: string;
  private showFlashback: boolean = true;
  private dataSet: any = BBReal;
  // TODO: Fix toggle for datasets
  @
  @Input()
  set DataSet(data: any) {
    // d3.select("#svgChart").remove();
    // d3.selectAll("svg > *").remove();
    this.svg = d3.select("#svgChart");
    this.svg.selectAll("*").remove();
    if (data == "LRRH") {
      this.dataSet = LRRH;
      this.ngOnInit();
      console.log("input data set LRRH");
    } else if (data == "BB") {
      console.log("input data set BB");
      this.dataSet = BB;
      this.ngOnInit();
    } else {
      console.log("input data set LRRH");
      this.dataSet = BBReal;
    }
  }
  @Input()
  set hideCharacters(characters: any) {
    console.log("new value for hideCharacters in multi-series", characters);
    this.hideChars(characters);
  }
  @Input()
  set showCharacters(characters: any) {
    console.log("new value for showCharacters in multi-series", characters);
    this.showChars(characters);
  }
  @Input()
  set newGradient2(gradient2:string){
    this._newGradient2 = gradient2;
    console.log("value for setted new gradient", gradient2);
    console.log("----value for setted character", this._newCharacter);
    //this.addGradient(this._newColor, this._newCharacter);
    this.addGradient(this._newGradient1,this._newGradient2 , this._newCharacter)

  }
  @Input()
  set newGradient1(gradient1:string ){
    this._newGradient1 = gradient1;
   // this._newGradient2 = gradient2;
    console.log("value for setted new gradient", gradient1);
    console.log("----value for setted character", this._newCharacter);
    this.addGradient(this._newGradient1,this._newGradient2 , this._newCharacter)

   // this.addGradient(this._newGradient1,this._newGradient2,this._newCharacter);
   // this.colorChange(this._newColor, this._newCharacter);

  }
  // @Input() newColor: strin g;
  @Input()
  set newColor(color: string) {
    this._newColor = color;
    console.log("value for setted newColor", color);
   // console.log("----value for setted character", this._newCharacter);
    this.colorChange(this._newColor, this._newCharacter);

  }
  @Input()
  set newCharacter(character: string) {
    this._newCharacter = character;
    console.log("value for setted newCharacter in multi-series", character);
    this.colorChange(this._newColor, this._newCharacter);
  }
  showChars(character) {
    console.log("called show character", character);
    d3.select("#" + character).style("opacity", "1");
  }
  data: any;
  svg: any;
  margin = { top: 20, right: 80, bottom: 30, left: 50 };
  g: any;
  width: number;
  height: number;
  x;
  y;
  z;
  line;

  constructor() {}

  ngOnInit() {
    this.initComp();
  }
  //TODO: Make flashback better transition
  //make on hover , rotate flashback , show tooltip
  public flashbackBB(): void {
    this.svg = d3.select("#svgChart");
    this.svg.selectAll("*").remove();
    this.dataSet = BB;
    this.ngOnInit();
  }
  public initComp(): void {
    this.showFlashback = true;
    this.data = this.dataSet.map(v => v.values.map(v => v.date))[0];
    //.reduce((a, b) => a.concat(b), []);

    this.initChart();
    this.drawAxis();
    // this.colorChange();
    this.drawPath();
    this.opacity();
    this.drawDashed();
    if (this.dataSet == BBReal) this.appendFlashback();
    this.bbColor();
  }

  private appendFlashback(): void {
    this.showFlashback = false;

    d3.selectAll(".city")
      .append("svg:image")
      .attr("id", "flashback")
      .attr("x", 225)
      .attr("y", 250)
      .attr("width", 150)
      .attr("height", 150)
      .attr("xlink:href", "../../assets/spiralTrans.png")
      .on("click", function(d) {
        d3.event.stopPropagation();
      })
      .on("mouseover", function(d) {
        console.log("hovered flashback");
      })
      .on("mouseout", function(d) {
        console.log("out of flashback");
      });
  }

  private renderGraph() {}
  private colorChange(color, character): void {
    d3.select("#" + character).style("stroke", color);
  }
  
  private addGradient(gradient1,gradient2,character):void{
    // if(gradient1!=""&& gradient1!=null && gradient2!=""&&gradient2!=null){

          
    var svg =   d3.select("#svgChart");
    var defs = svg.append("defs");

    svg.append("linearGradient")				
    .attr("id", "area-gradient")			
    .attr("gradientUnits", "userSpaceOnUse")	
   	
.selectAll("stop")						
    .data([								
        {offset: "0%", color: "red"},		
        {offset: "30%", color: "red"},	
        {offset: "45%", color: "black"},		
        {offset: "55%", color: "black"},		
        {offset: "60%", color: "lawngreen"},	
        {offset: "100%", color: "lawngreen"}	
    ])						
.enter().append("stop")			
    .attr("offset", function(d) { return d.offset; })	
    .attr("stop-color", function(d) { return d.color; });



    var gradient = defs.append("linearGradient")
    .attr("id", "svgGradient")
    .attr("x1", "0%")
    .attr("x2", "100%")
    .attr("y1", "0%")
    .attr("y2", "100%");

    gradient.append("stop")
    .attr('class', 'start')
    .attr("offset", "0%")
    .attr("stop-color", "red")
    .attr("stop-opacity", 1);

    gradient.append("stop")
    .attr('class', 'end')
    .attr("offset", "100%")
    .attr("stop-color", "blue")
    .attr("stop-opacity", 1);
    console.log("gradient change");

    d3.select("#"+character).style("stroke" , "url(#line-gradient)");





  //var colorInterpolator = d3.interpolateRgbBasis([gradient1, gradient2]);
// var colorHandler = (d, i, nodes) => {
//   let color = d3.color(colorInterpolator(d.t));
//   color.opacity = i/nodes.length > 1-complete ? 1 : 0;
//   return color; 
// };
      console.log("====called add gradient with values : "+gradient1+" ,"+gradient2);
    //d3.select("#" + character).style("stroke", gradient1);
    console.log("called add gradient with values : "+gradient1+" "+gradient2);
    // }
    
  }
  private initChart(): void {
    this.svg = d3.select("#svgChart");

    this.width = this.svg.attr("width") - this.margin.left - this.margin.right;
    this.height =
      this.svg.attr("height") - this.margin.top - this.margin.bottom;

    this.g = this.svg
      .append("g")
      .attr(
        "transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")"
      );

    this.x = d3Scale.scaleTime().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);
    this.z = d3Scale.scaleOrdinal(d3ScaleChromatic.schemeCategory10);

    this.line = d3Shape
      .line()
      .curve(d3Shape.curveBasis)
      .x((d: any) => this.x(d.date))
      .y((d: any) => this.y(d.pos));

    this.x.domain(d3Array.extent(this.data, (d: Date) => d));

    this.y.domain([
      d3Array.min(this.dataSet, function(c) {
        return d3Array.min(c.values, function(d) {
          return d.pos - 20;
        });
      }),
      d3Array.max(this.dataSet, function(c) {
        return d3Array.max(c.values, function(d) {
          return d.pos + 30;
        });
      })
    ]);

    this.z.domain(
      this.dataSet.map(function(c) {
        return c.id;
      })
    );
  }
  private hideChars(characters: any) {
    // d3.select("#" + "Grandma").style("stroke", "red");
    if (characters) {
      for (let char of characters) {
        console.log("character ", char);
        // console.log("display value == ", d3.select("#"+char).style.position);
        d3.select("#" + char).style("display", "none");
        d3.select("#" + char).style("font", "30px sans-serif");
        //  console.log("display value == ", d3.select("#"+char).style);
        // d3.select("#" + char).style("font", "0px san-serif");
      }
    }
  }

  private drawAxis(): void {
    // this.g
    //   .append("g")
    //   .attr("class", "axis axis--x")
    //   .attr("transform", "translate(0," + this.height + ")")
    //   .call(d3Axis.axisBottom(this.x));
    // this.g
    //   .append("g")
    //   .attr("class", "axis axis--y")
    //   .call(d3Axis.axisLeft(this.y))
    //   .append("text")
    //   .attr("transform", "rotate(-90)")
    //   .attr("y", 6)
    //   .attr("dy", "0.71em")
    //   .attr("fill", "#000");
    // // .text("Temperature, ºF");
  }
  // public removeLine(): void {
  //   d3.select("");
  // }
  // private colorChange(): void {
  //   d3.select("");
  // }
  private colorMake(): void {
    // d3.select("#" + "Wolf")
    //   .style("stroke-width", "3")
    //   .style("stroke", "indianred");
    // d3.select("#" + "Blanchette")
    //   .style("stroke-width", "3")
    //   .style("stroke", "steelblue");
    // d3.select("#" + "Grandma")
    //   .style("stroke-width", "3")
    //   .style("stroke", "steelblue");
    // d3.select("#" + "Woodcutter")
    //   .style("stroke-width", "3")
    //   .style("stroke", "steelblue");
    d3.select("#" + "Mother").style("stroke-width", "3");
    // .style("stroke", "black");
    d3.select("#" + "Benjamin").style("stroke-width", "3");
    // .style("stroke", "black");
  }
  private drawDashed(): void {
    d3.select("#" + "Mother").style("stroke-dasharray", "3,3");
    d3.select("#" + "Elizabeth").style("stroke-dasharray", "3,3");
  }
  private opacity(): void {
    const characters = [
      "Benjamin",
      "Queenie",
      "Daisy",
      "QueeniesHusband",
      "Mother",
      "Father",
      "Elizabeth"
    ];
    for (var i = 0; i < characters.length; i++) {
      console.log("opacity", String(1 - 0.1 * i));

      d3.select("#" + characters[i]).style(
        "stroke",
        "rgba(100 , 100," +
          String(255 - 10 * i) +
          "," +
          String(1 - 0.15 * i) +
          ")"
      );
    }
  }
  private bbColor(): void {
    d3.select("#" + "Mother").style("stroke-width", "3");
    // .style("stroke", "darkblue");
    d3.select("#" + "Father").style("stroke-width", "3");
    // .style("stroke", "darkblue");
    d3.select("#" + "Elizabeth").style("stroke-width", "3");
    // .style("stroke", "darkblue");
    d3.select("#" + "Benjamin").style("stroke-width", "8");
    // .style("stroke", "black");
  }
  // TODO: Change city to lines
  private drawPath(): void {
    let city = this.g
      .selectAll(".city")
      .data(this.dataSet)
      .enter()
      .append("g")
      .attr("class", "city");

    city
      .append("path")
      .attr("class", "line")
      .attr("d", d => this.line(d.values))
      .style("stroke", "black")

      //.style("stroke", "black")
      .attr("id", function(d) {
        return d.id;
      })
      .on("click", function(d) {
        console.log("clicked on path of id", d.id);
        d3.select("#" + d.id).style("stroke", "blue");
        d3.event.stopPropagation();
      });
    city.append("text", "text");
    city
      .append("text")
      .datum(function(d) {
        return { id: d.id, value: d.values[d.values.length - 1] };
      })
      .attr(
        "transform",
        d =>
          "translate(" + this.x(d.value.date) + "," + this.y(d.value.pos) + ")"
      )
      .attr("x", 10)
      .attr("dy", "0.23em")
      .style("font", "12px fantasy")
      .style("padding", "130px ")
      .text(function(d) {
        return d.id;
      })
      .on("click", function(d) {
        console.log("clicked on city", d.id);
        d3.event.stopPropagation();
      });
  }
}
