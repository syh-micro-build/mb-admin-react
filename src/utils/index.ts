/**
 * 把对象转为formData
 */
export function objToFormData(obj: Record<string, any>) {
  const formData = new FormData()
  Object.keys(obj).forEach((key) => {
    formData.append(key, obj[key])
  })
  return formData
}