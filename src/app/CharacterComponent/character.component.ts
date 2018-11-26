import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { LRRH } from "../../../shared";

@Component({
  selector: "character-app",
  templateUrl: "character.component.html",
  styleUrls: ["character.component.css"]
})
export class CharacterComponent implements OnInit {
  characters = new Array();
  private title: string;
  private _characterHide = new Array();
  ngOnInit() {
    this.title = "Character";
    // this.characters = LRRH.map(v => v.id);
    LRRH.map(v => this.characters.push(v.id));
    console.log(this.characters);
  }
  //Hide the character when clicked , if unchecked remove hide.
  @Output() characterHide = new EventEmitter<any>();
  @Output() characterShow = new EventEmitter<any>();
  private onSelect(event) {
    let allChars = ["Wolf", "Grandma", "Blanchette"];
    this._characterHide = event;
    console.log(
      "event when selected in CharacterComponent",
      this._characterHide
    );
    for (let char in allChars) {
      console.log("char in allChars characterComponent", allChars[char]);
      if (this._characterHide.includes(allChars[char])) {
        console.log("emitting character hide", allChars[char]);
        this.characterHide.emit(allChars[char]);
      } else {
        console.log("emitting character show ", allChars[char]);
        this.characterShow.emit(allChars[char]);
      }
    }
  }
}
