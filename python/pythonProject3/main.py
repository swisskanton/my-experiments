from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait

username = "kormanyosa"
password = "cdXnsnsh"


if __name__ == '__main__':
    # initialize the Chrome driver
    driver = webdriver.Chrome("C:/WebDriver/bin/chromedriver")

    # head to github login page
    driver.get("https://idp.e-kreta.hu/Account/Login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Dkreta-web%26response_type%3Dcode%26scope%3Dopenid%2520offline_access%2520kreta-core-webapi.public%26state%3DOpenIdConnect.AuthenticationProperties%253D-Bh0hFgP_EKwGPzc7csAhZyJSH7z_syL1m_-pMZfnQnfv-UwOvZH7H8zZ_qcjolUZDYqoKdtvq7eEB2Cq_OHCcrHt--FuEoAelfvnc4-3vuMbvjIEk4dqU806s9Qzi2RAsVNLUtbz1PKhStb7-Ywvg%26response_mode%3Dform_post%26nonce%3D637695765094347450.NGQ4MDVlZmYtNDRlMS00NDk0LWJlNDYtZDY0MTQ3MTAxY2VkYjYzMmVjNTUtMzFhNy00YThhLThhODgtYjAxYWJlM2I1MDM2%26institute_code%3Dklik029662001%26institute_data%3DeyJuZXh0X3VwZGF0ZV9kYXRlX3RpbWUiOiIyMDIxLjExLjAyLiAyMjowMCIsImlzX3N6aXJfaW5zdGl0dXRlIjpmYWxzZSwiaXNfbGljZW5jZV92YWxpZCI6dHJ1ZSwiaXNfYXJjaGl2ZSI6ZmFsc2UsImlzX2Nzb2trZW50ZXR0X2dvbmR2aXNlbG8iOnRydWUsImlzX2ludGV6bWVueV9yb3ZpZG5ldiI6dHJ1ZSwiaXNfc3VjY2Vzc19hdXRob3JpemVkX2RhdGUiOmZhbHNlfQ%253D%253D%26redirect_uri%3Dhttps%253A%252F%252Fklik029662001.e-kreta.hu%26x-client-SKU%3DID_NET461%26x-client-ver%3D5.3.0.0")
    # find username/email field and send the username itself to the input field
    driver.find_element_by_id("UserName").send_keys(username)
    # find password input field and insert password as well
    driver.find_element_by_id("Password").send_keys(password)
    # click login button
    driver.find_element_by_name("LoginType").click()

    # wait the ready state to be complete
    WebDriverWait(driver=driver, timeout=10).until(
        lambda x: x.execute_script("return document.readyState === 'complete'")
    )
    error_message = "Incorrect username or password."
    # get the errors (if there are)
    errors = driver.find_elements_by_class_name("flash-error")
    # print the errors optionally
    # for e in errors:
    #     print(e.text)
    # if we find that error message within errors, then login is failed
    if any(error_message in e.text for e in errors):
        print("[!] Login failed")
    else:
        print("[+] Login successful")

    # close the driver
    driver.close()