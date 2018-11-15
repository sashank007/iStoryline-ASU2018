import { Component, OnInit } from "@angular/core";
import { LRRH } from "../../../shared";
@Component({
  selector: "character-app",
  templateUrl: "character.component.html",
  styleUrls: ["character.component.css"]
})
export class CharacterComponent implements OnInit {
  characters = new Array();
  private title: string;
  ngOnInit() {
    this.title = "Character";
    // this.characters = LRRH.map(v => v.id);
    LRRH.map(v => this.characters.push(v.id));
    console.log(this.characters);
  }
}
