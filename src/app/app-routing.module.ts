import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { LandingpageComponent } from "./pages/index/landingpage.component";
import { Winter2026Component } from "./pages/winter2026/landingpage.component";

const routes: Routes = [
  { path: "", component: Winter2026Component, pathMatch: "full" },
  // { path: "2025", component: LandingpageComponent, pathMatch: "full" },
  { path: "2025", component: LandingpageComponent, pathMatch: "full" },
  { path: "**", component: Winter2026Component, pathMatch: "full" },
  { path: "2026", component: Winter2026Component, pathMatch: "full" },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      // useHash: true
    })
  ],
  exports: []
})
export class AppRoutingModule {}
