import { MediaMatcher } from "@angular/cdk/layout";
import { ChangeDetectorRef, Component, OnDestroy, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material";
/** @title Responsive sidenav */
@Component({
  selector: "nav-drawer",
  templateUrl: "navdrawer.component.html",
  styleUrls: ["navdrawer.component.css"]
})
export class NavDrawerComponent {
  showFiller = false;
  subTemplates = ["character", "text", "shapes", "story"];
  showText: boolean = false;
  colorChange: string = "";
  gradientChange1: string = "";
  gradientChange2: string = "";
  characterId: string = "";

  hero = "batman";
  @Input("newColor") newColor: string;
  @Input("newGradient1") newGradient1: string;
  @Input("newGradient2") newGradient2: string;
  @Input("DataSet") DataSet: any;
  @Input("newCharacter") newCharacter: string;
  @Input("hideCharacters") hideCharacters: any;
  @Input("showCharacters") showCharacters: any;
  showTriangle: boolean = false;
  showRectangle: boolean = false;
  showSquare: boolean = false;
  showCircle: boolean = false;
  showSubTemplate() {
    console.log("clicked");
    console.log(this.showText);
    this.showText = !this.showText;
  }

  clickLRRH() {
    console.log("click LRRH");
    this.DataSet = "LRRH";
  }
  clickBB() {
    console.log("click BB");
    this.DataSet = "BB";
  }
  onGradientChange(gradientChange : any){
    console.log("inside parent component onGradientChange", gradientChange);
    this.gradientChange1 = gradientChange.color1;
    this.gradientChange2 = gradientChange.color2;
    this.characterId = gradientChange.character;
    this.newGradient1 = this.gradientChange1;
    this.newGradient2 = this.gradientChange2;
    this.newCharacter = this.characterId;
    console.log(
      "current gradients in parent for id",
      this.gradientChange1,
      this.gradientChange2,
      this.characterId
    );
  }
  onColorChange(colorChange: any) {
    console.log("inside parent component onColorChange", colorChange);
    this.colorChange = colorChange.color;
    this.characterId = colorChange.character;
    this.newColor = this.colorChange;
    this.newCharacter = this.characterId;
    console.log(
      "current color in parent for id",
      this.colorChange,
      this.characterId
    );
  }
  onSvgClicked(svg: any) {
    console.log("svg  clicked", svg);
    if (svg == "triangle") {
      console.log("show   triangle");
      this.showTriangle = !this.showTriangle;
    } else if (svg == "rectangle") {
      console.log("show rectangle");

      this.showRectangle = !this.showRectangle;
    } else if (svg == "square") {
      console.log("show square");

      this.showSquare = !this.showSquare;
    } else if (svg == "circle") {
      console.log("show circle");

      this.showCircle = !this.showCircle;
    }
    // const gifDom = document.createElement("img");
    // gifDom.setAttribute("src", gif);
    // gifDom.setAttribute("width", "100px");
    // gifDom.setAttribute("height", "100px");
    // const parent = document.getElementById("gifs");
    // const plainField = document.getElementById("gif-container");
    // plainField.appendChild(gifDom);
  }
  createGif(gif: any) {
    // TODO: Create new dom element when clicked
    //TODO: Dom element must be ngDraggable
    console.log("gif", gif);
    const gifDom = document.createElement("img");
    gifDom.setAttribute("src", gif);
    gifDom.setAttribute("width", "100px");
    gifDom.setAttribute("height", "100px");
    const parent = document.getElementById("gifs");
    const plainField = document.getElementById("gif-container");
    plainField.appendChild(gifDom);
    // const newField = plainField.cloneNode(true);
    // const newField = plainField.firstElementChild.cloneNode(true);
    // parent.appendChild(newField);
    // // parent.className = "ng-draggable";
    // // parent.appendChild(newField);
    // newField.appendChild(gifDom);
    // console.log("new field", newField);
  }
  onCharacterHide(characters: any) {
    console.log("onCharacterHide navdrawer", characters);
    this.hideCharacters = characters;
  }
  onCharacterShow(characters: any) {
    console.log("onCharacterShow navdrawer", characters);
    this.showCharacters = characters;
  }
}
