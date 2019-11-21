import EventTracker from '../../../app/event-tracker';

describe('Testing EventTracker Component', () => {
  it('EventTracker should work', () => {
    EventTracker.init();
    EventTracker.raise();
    expect(EventTracker).toBeDefined();
  });
});
