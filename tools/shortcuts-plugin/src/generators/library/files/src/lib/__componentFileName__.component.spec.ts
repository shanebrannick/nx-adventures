import { TestBed } from '@angular/core/testing';
import {<%= componentClassName %> } from './<%= componentFileName %>.component';
import { RouterModule } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';


describe('<%= componentClassName %>', () => {
  let component:<%= componentClassName %>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [<%= componentClassName %>, RouterModule.forRoot([])],
      providers: [
       // Add any necessary providers here
      ], 
    }).compileComponents();

    const fixture = TestBed.createComponent(<%= componentClassName %>);
    component = fixture.componentInstance;
  });

  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
