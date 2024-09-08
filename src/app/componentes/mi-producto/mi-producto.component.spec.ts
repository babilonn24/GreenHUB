import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiProductoComponent } from './mi-producto.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('MiProductoComponent', () => {
  let component: MiProductoComponent;
  let fixture: ComponentFixture<MiProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,  
        RouterTestingModule 
      ], 
      declarations: [MiProductoComponent]
    });
    fixture = TestBed.createComponent(MiProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
