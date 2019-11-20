import Events from './events';

class EventTracker {
  static init() {
    // initialize analytics code
  }

  static raise(eventName) {
    const pages = [
      Events.HOME_PAGE
    ];
    const generics = [
      Events.APP_CRASHED
    ];
    const actions = [
      Events.WEATHER_DETAILS_REQUESTED
    ];

    if (generics.includes(eventName)) {
      // call analytics function for this kind of event
    } else if (actions.includes(eventName)) {
      // call analytics function for this kind of event
    } else if (pages.includes(eventName)) {
      // call analytics function for this kind of event
    }
  }
}

export default EventTracker;
