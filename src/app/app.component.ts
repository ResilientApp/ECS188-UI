import {
  Component,
  OnInit,
  Renderer2,
  HostListener,
  Inject
} from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { Location } from "@angular/common";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  isCollapsed = true;
  private navLinks: NodeListOf<HTMLAnchorElement> | undefined;

  constructor(
    private renderer: Renderer2,
    private location: Location,
    @Inject(DOCUMENT) private document: Document
  ) {}

  // Intercept window scrolling to toggle navbar and highlight correct link
  @HostListener("window:scroll", ["$event"])
  onWindowScroll(): void {
    // Toggle navbar background
    const navbar = this.document.getElementById("navbar-top");
    if (window.pageYOffset > 100) {
      navbar?.classList.remove("navbar-transparent");
      navbar?.classList.add("bg-danger"); // or your desired class
    } else {
      navbar?.classList.add("navbar-transparent");
      navbar?.classList.remove("bg-danger");
    }

    // Highlight the active nav link
    if (!this.navLinks) return; // if for some reason links not found
    const scrollPos = window.scrollY + 80; // offset for fixed nav

    this.navLinks.forEach(link => {
      const targetId = link.getAttribute("href")?.substring(1);
      if (!targetId) return;

      const section = this.document.getElementById(targetId);
      if (section) {
        const rect = section.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const bottom = top + rect.height;

        if (scrollPos >= top && scrollPos < bottom) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      }
    });
  }

  ngOnInit(): void {
    // Grab all anchor links that point to #someId
    this.navLinks = this.document.querySelectorAll(
      '.navbar-nav a[href^="#"]'
    ) as NodeListOf<HTMLAnchorElement>;

    // Attach a click listener for SMOOTH scrolling
    this.navLinks.forEach(link => {
      this.renderer.listen(link, "click", event => {
        event.preventDefault(); // prevent the default hash jump
        const targetId = link.getAttribute("href")?.substring(1);
        if (!targetId) return;

        const section = this.document.getElementById(targetId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });

    // Initial highlight in case user is already scrolled
    this.onWindowScroll();
  }
}
