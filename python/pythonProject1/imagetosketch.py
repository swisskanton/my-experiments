import cv2
image = cv2.imread("ablak.jpg")
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
cv2.imwrite("ablak_gray.png", gray_image)
inverted_image = 255 - gray_image
cv2.imwrite("ablak_inverted.png", inverted_image)
blurred = cv2.GaussianBlur(inverted_image, (21, 21), 0)
cv2.imwrite("ablak_blured.png", blurred)
inverted_blurred = 255 - blurred
pencil_sketch = cv2.divide(gray_image, inverted_blurred, scale=256.0)
cv2.imwrite("ablak_sketch.png", pencil_sketch)