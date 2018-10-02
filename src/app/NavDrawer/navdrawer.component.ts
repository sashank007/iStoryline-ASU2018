import { MediaMatcher } from "@angular/cdk/layout";
import { ChangeDetectorRef, Component, OnDestroy } from "@angular/core";
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
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      "thumbs-up",
      sanitizer.bypassSecurityTrustResourceUrl(
        "assets/img/examples/thumbup-icon.svg"
      )
    );
  }
}
