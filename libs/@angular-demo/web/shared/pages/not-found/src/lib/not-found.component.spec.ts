import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AvivaNotFoundPage } from './not-found.component';

describe('AvivaNotFoundComponent', () => {
  let component: AvivaNotFoundPage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvivaNotFoundPage, RouterModule.forRoot([])],
      providers: [
        // Add any necessary providers here
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(AvivaNotFoundPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
