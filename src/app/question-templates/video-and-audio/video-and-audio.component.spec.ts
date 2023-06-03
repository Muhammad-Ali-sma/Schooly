import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoAndAudioComponent } from './video-and-audio.component';

describe('VideoAndAudioComponent', () => {
  let component: VideoAndAudioComponent;
  let fixture: ComponentFixture<VideoAndAudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoAndAudioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoAndAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
