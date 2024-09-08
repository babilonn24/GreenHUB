import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgregarUsuarioComponent } from './componentes/agregar-usuario/agregar-usuario.component';
import { FormsModule } from '@angular/forms';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { ModificarUsuarioComponent } from './componentes/modificar-usuario/modificar-usuario.component';
import { NavBarComponent } from './componentes/nav-bar/nav-bar.component';
import { LoginComponent } from './componentes/login/login.component';
import { MiUsuarioComponent } from './componentes/mi-usuario/mi-usuario.component';
import { AgregarProductoComponent } from './componentes/agregar-producto/agregar-producto.component';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { VerUsuarioComponent } from './componentes/ver-usuario/ver-usuario.component';
import { VerProductoComponent } from './componentes/ver-producto/ver-producto.component';
import { MiProductoComponent } from './componentes/mi-producto/mi-producto.component';
import { ModificarProductoComponent } from './componentes/modificar-producto/modificar-producto.component';
import { CategoriaProductoComponent } from './componentes/categoria-producto/categoria-producto.component';
import { ChatbotComponent } from './componentes/chatbot/chatbot.component';

@NgModule({
  declarations: [
    AppComponent,
    AgregarUsuarioComponent,
    UsuariosComponent,
    PrincipalComponent,
    ModificarUsuarioComponent,
    NavBarComponent,
    LoginComponent,
    MiUsuarioComponent,
    AgregarProductoComponent,
    CarritoComponent,
    VerUsuarioComponent,
    VerProductoComponent,
    MiProductoComponent,
    ModificarProductoComponent,
    CategoriaProductoComponent,
    ChatbotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: 'MAX_FILE_SIZE', useValue: 52428800 }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
