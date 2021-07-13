export const redirect = (destination = "/") => ({
  redirect: {
    destination,
    permanent: false,
  },
});

export const notFound: { notFound: true } = {
  notFound: true,
};

export const parse = (a: any) => JSON.parse(JSON.stringify(a))
