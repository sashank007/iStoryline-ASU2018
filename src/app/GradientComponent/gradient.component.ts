import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: "gradient-app",
    templateUrl: "gradient.component.html",
    styleUrls: ["gradient.component.css"]
})
export class GradientComponent {
    title = "Gradient";
    // @Output()
    // gradientChange = new EventEmitter<FormGroup>();
    // gradientcolorForm = new FormGroup({
    //     color1: new FormControl(""),
    //     color2: new FormControl(""),
    //     character: new FormControl("")
    // });
    // public onSubmit(): void {
    //     console.log("change color", this.gradientcolorForm.value);
    //     this.gradientChange.emit(this.gradientcolorForm.value);
    // }
}