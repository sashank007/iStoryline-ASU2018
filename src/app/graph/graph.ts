import { MediaMatcher } from "@angular/cdk/layout";
import { ChangeDetectorRef, Component, OnDestroy } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material";
import {NavDrawerComponent} from "../NavDrawer/navdrawer.component";
/** @title Responsive sidenav */
@Component({
  selector: "graph",
  templateUrl: "graph.html",
  //styleUrls: ["graph.css"]
})
export class graph extends NavDrawerComponent{
  showFiller = false;
  graph() {
    console.log("graph constructor");
  }
}
