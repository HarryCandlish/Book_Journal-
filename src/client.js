import createClient from "@sanity/client";

export default createClient({
  projectId: "gde3k8c2", // find this at manage.sanity.io or in your sanity.json
  dataset: "production", // this is from those question during 'sanity init'
  useCdn: true,
  token: 'skonWO7ms9Z668CCqSeDSPTkhT0RLxcnWpKgW6bSjlwmuAfjfgRTZPFOuVJFfJgON5uQisSifhUGsUyG5fgqA6rIFJ5CkJe0iyqZmHKn4qHWMLppPAFc3Uhj5lmiC5zAuyZbfidX4IoYJhcdqabrSvVzKNZ1q0CvUkKM0zS6IYR3qdX5BJ42'
});
  




