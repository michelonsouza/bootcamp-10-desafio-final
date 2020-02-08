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
  if (!delivery) {
    return {
      data: { type: 'notfound', errors: ['Delivery not found'] },
      status: 404,
    };
  }

  if (delivery.canceled_at !== null && validations.includes('canceled_at')) {
    const formatedDate = format(
      delivery.canceled_at,
      "MMMM dd', 'yyyy 'at' HH:mm"
    );

    return {
      data: {
        type: 'unauthorized',
        errors: [`Delivery canceled on ${formatedDate}`],
      },
      status: 401,
    };
  }

  if (delivery.start_date !== null && validations.includes('start_date')) {
    const formatedDate = format(
      delivery.start_date,
      "MMMM dd', 'yyyy 'at' HH:mm"
    );

    return {
      data: {
        type: 'unauthorized',
        errors: [`Delivery started on ${formatedDate}`],
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
    const formatedDate = format(
      delivery.end_date,
      "MMMM dd', 'yyyy 'at' HH:mm"
    );

    return {
      data: {
        type: 'unauthorized',
        errors: [`Delivery ended on ${formatedDate}`],
      },
      status: 401,
    };
  }

  return null;
}

export function itsWorkTime(date) {
  const parsedDate = parseISO(date);
  const startDate = setHours(setMinutes(setSeconds(new Date(), 0), 0), 8);
  const endDate = setHours(setMinutes(setSeconds(new Date(), 0), 0), 18);

  return isAfter(parsedDate, startDate) && isBefore(parsedDate, endDate);
}
