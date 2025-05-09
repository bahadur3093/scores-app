import { format } from 'date-fns';

export const formatDate = (
  date: Date,
  formatString = 'MMMM dd, yyyy'
): string => {
  return format(date, formatString);
};
