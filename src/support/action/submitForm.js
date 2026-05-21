/**
 * Submit the given form
 * @param  {String}   formSelector Form element selector
 */
export default async (formSelector) => {
  const form = await $(formSelector);
  await form.submit();
};
