'use strict';
debugger
truncateMethod();
const text = 'Lorem';
text.truncate({
  length: 0,
  separator: '...',
});


/**
 * @returns {undefined}
 */
function truncateMethod() {
  /**
   * @param {Object} options
   *
   * @returns {string}
   */
  String.prototype.truncate = function(options = {}) {
    if (options.length === 0) {
      return options.omission || '...';
    }
    
    const length = options.length || 30;
    const omission = options.omission || '...';
    const separator = options.separator || ' ';

    if (length < omission.length) {
      return omission;
    }

    const possibleLength = length - omission.length;
    const trimmedPart = this.substring(0, possibleLength);

    const rest = this.substring(possibleLength, this.length);
    const firstOfRest = rest.substring(0, separator.length);

    if (this.length <= length) {
      return this;
    }

    if (this.substring(0, possibleLength) < omission.length) {
      return omission;
    }

    if (firstOfRest === separator) { // ends on separator(' ---- ')
      return trimmedPart + omission;
    } else { // find closest separator
      const lastIndOfGap = trimmedPart.lastIndexOf(separator);

      if (lastIndOfGap !== -1) { // + separator found
        return this.substring(0, lastIndOfGap) + omission;
      } else { // - no separator//
        if (trimmedPart.length === 1) {
          return omission;
        }

        return trimmedPart + omission;
      }
    }
  };
}