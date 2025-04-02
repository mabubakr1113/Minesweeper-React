import { Howl } from 'howler';

class SoundManager {
  constructor() {
    this.sounds = {
      click: new Howl({
        src: ['/sounds/click.mp3'],
        volume: 0.5
      }),
      explosion: new Howl({
        src: ['/sounds/explosion.mp3'],
        volume: 0.7
      }),
      flag: new Howl({
        src: ['/sounds/flag.mp3'],
        volume: 0.4
      }),
      win: new Howl({
        src: ['/sounds/win.mp3'],
        volume: 0.6
      })
    };
  }

  play(soundName) {
    if (this.sounds[soundName]) {
      this.sounds[soundName].play();
    }
  }

  stopAll() {
    Object.values(this.sounds).forEach(sound => sound.stop());
  }
}

export const soundManager = new SoundManager(); 