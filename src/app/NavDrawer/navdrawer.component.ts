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
  characterId: string = "";

  hero = "batman";
  @Input("newColor") newColor: string;
  @Input("DataSet") DataSet: any;
  @Input("newCharacter") newCharacter: string;
  @Input("hideCharacters") hideCharacters: any;
  @Input("showCharacters") showCharacters: any;
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
