import { Component } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
@Component({
  selector: "color-app",
  templateUrl: "color.component.html",
  styleUrls: ["color.component.css"]
})
export class ColorComponent {
  title = "Color";

  colorForm = new FormGroup({
    color: new FormControl(""),
    character: new FormControl("")
  });

  public onSubmit(): void {
    console.log("change color", this.colorForm.value);
  }
}
