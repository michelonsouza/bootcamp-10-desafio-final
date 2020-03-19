import {
  format,
  parseISO,
  isAfter,
  isBefore,
  setHours,
  setMinutes,
  setSeconds,
} from 'date-fns';

export function deliveryValidator(delivery, validations = []) {
  function formatedDate(date) {
    return format(date, "MMMM dd', 'yyyy 'at' HH:mm");
  }

  if (!delivery) {
    return {
      data: { type: 'notfound', errors: ['Delivery not found'] },
      status: 404,
    };
  }

  if (delivery.canceled_at !== null && validations.includes('canceled_at')) {
    return {
      data: {
        type: 'unauthorized',
        errors: [`Delivery canceled on ${formatedDate(delivery.canceled_at)}`],
      },
      status: 401,
    };
  }

  if (delivery.start_date !== null && validations.includes('start_date')) {
    return {
      data: {
        type: 'unauthorized',
        errors: [`Delivery started on ${formatedDate(delivery.start_date)}`],
      },
      status: 401,
    };
  }

  if (!delivery.start_date && validations.includes('!start_date')) {
    return {
      data: {
        type: 'unauthorized',
        errors: ['Deliveries not started cannot be completed'],
      },
      status: 401,
    };
  }

  if (delivery.end_date !== null && validations.includes('end_date')) {
    return {
      data: {
        type: 'unauthorized',
        errors: [`Delivery ended on ${formatedDate(delivery.end_date)}`],
      },
      status: 401,
    };
  }

  return null;
}

export function itsWorkTime(date) {
  const parsedDate = date instanceof Date ? date : parseISO(date);
  const startDate = setHours(setMinutes(setSeconds(date, 0), 0), 8);
  const endDate = setHours(setMinutes(setSeconds(date, 0), 0), 18);

  return isAfter(parsedDate, startDate) && isBefore(parsedDate, endDate);
}
