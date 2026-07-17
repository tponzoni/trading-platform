// src/shared/services/soundService.ts

const clickSound =
  new Audio("/sounds/click.wav");

clickSound.volume = 0.05;

const loadedSound =
  new Audio("/sounds/loaded.wav");

loadedSound.volume = 0.03;

export function playClick(): void {

  clickSound.currentTime = 0;

  void clickSound.play();

}

export function playLoaded(): void {

  loadedSound.currentTime = 0;

  void loadedSound.play();

}