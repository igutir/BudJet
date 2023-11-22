import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePageRoutingModule } from '../home/home-routing.module';
import { SplitPaneComponent } from './split-pane/split-pane.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
    declarations: [
        SplitPaneComponent,
        FooterComponent,
    ],
    imports: [
        CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule

    ],
    exports: [
        SplitPaneComponent,
        FooterComponent,

    ]
})
export class ComponentsModule{}