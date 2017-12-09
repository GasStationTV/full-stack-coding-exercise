export const required = value =>
  value ? undefined : 'Flag Type field required';

export const dateCheck = (start, end) => {
  if (start && end) {
    if (Date.parse(start) > Date.parse(end)) {
      return 'Start date must be before end date';
    }
    if (new Date(start).toDateString() === new Date(end).toDateString()) {
      return 'Start date cannot be the same as end date';
    }
  }
  if (!start && end) {
    if (Date.parse(end) < Date.parse(new Date())) {
      return 'End date must not be in the past';
    }
  }
};
