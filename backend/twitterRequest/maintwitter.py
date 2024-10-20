from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager as CM  # Corregido: 'ChromeDriverManager'
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By  # Asegúrate de importar 'By' para los selectores
import configparser
import pickle
import json
import time

login_url = "https://twitter.com/login"

config = configparser.ConfigParser()
config.read(r'E:\debunkd\debunkd\backend\twitterRequest\config.ini')  # Reemplaza con la ruta correcta a tu archivo configure.ini
username = config['X']['username']
password = config['X']['password']

# Función para guardar cookies en un archivo
def save_cookies(driver, filepath):
    with open(filepath, "wb") as file:
        pickle.dump(driver.get_cookies(), file)

# Función para cargar cookies desde un archivo
def load_cookies(driver, filepath):
    with open(filepath, "rb") as file:
        cookies = pickle.load(file)
        for cookie in cookies:
            driver.add_cookie(cookie)

# Configurar el servicio de ChromeDriver usando webdriver_manager para descargarlo automáticamente
service = Service(executable_path=CM().install())

# Opciones para el navegador (ejecutarlo en modo headless)
options = webdriver.ChromeOptions()
options.add_argument("--headless")  # Ejecutar en modo headless (sin interfaz gráfica)

# Inicializar el WebDriver
driver = webdriver.Chrome(service=service, options=options)

# Intentar cargar las cookies primero
try:
    driver.get("https://twitter.com")
    load_cookies(driver, "twitter_cookies.pkl")
    time.sleep(2)
    driver.get("https://twitter.com")  # Recargar la página con las cookies cargadas
    time.sleep(5)  # Esperar a que se cargue la página con las cookies
    if "login" in driver.current_url:
        raise Exception("No logged in, cookies may have expired.")
except Exception as e:
    print(f"Failed to load cookies: {e}")
    # Si no hay cookies o fallan, entonces iniciar sesión manualmente
    driver.get(login_url)
    time.sleep(5)  # Esperar que se cargue la página de inicio de sesión

    # Ingresar las credenciales (reemplaza con tus credenciales)
    username_input = driver.find_element(By.NAME, "text")
    username_input.send_keys(username)
    driver.find_element(By.XPATH, "//span[text()='Next']").click()

    time.sleep(2)

    password_input = driver.find_element(By.NAME, "password")
    password_input.send_keys(password)
    driver.find_element(By.XPATH, "//span[text()='Log in']").click()

    time.sleep(5)  # Esperar que se complete el inicio de sesión

    # Guardar las cookies una vez que inicies sesión
    save_cookies(driver, "twitter_cookies.pkl")

# Aquí puedes continuar con la navegación autenticada en Twitter
driver.get("https://twitter.com/home")
print("Logged in successfully!")


# URL del perfil de Twitter que quieres consultar
profiles_url =["https://twitter.com/JoeBiden","https://twitter.com/KamalaHarris","https://twitter.com/realDonaldTrump"] 
twitter_data = {}
try:
    for url in profiles_url:
        # Navegar al perfil de Twitter
        driver.get(url)

        # Esperar un poco para asegurarnos de que la página se cargue completamente
        time.sleep(5)

        # Desplazarse un poco hacia abajo para cargar más tweets
        for i in range(10):
            driver.execute_script("window.scrollBy(0,100)")
            time.sleep(0.2)        

        # Obtener el nombre de usuario
        username = driver.find_element(By.CSS_SELECTOR, "div[data-testid='UserName'] span").text

        # Obtener los tweets visibles en la página
        tweet_elements = driver.find_elements(By.CSS_SELECTOR, "div[data-testid='tweetText']")
        
        # Limpiar los tweets de secuencias de escape como \n o \u
        tweets = [tweet.text.replace("\n", " ").encode("ascii", "ignore").decode() for tweet in tweet_elements]
        
        # Guardar los tweets y el nombre de usuario en el diccionario, usando el nombre del usuario como clave
        twitter_data[username] = {
            "profile_url": url,
            "tweets": tweets
        }

        # Imprimir los datos de cada perfil
        print(f"Datos de {username} obtenidos exitosamente.")

    # Guardar los datos en un archivo JSON
    with open("twitter_data.json", "w") as json_file:
        json.dump(twitter_data, json_file, indent=4)

finally:
    # Cerrar el navegador
    driver.quit()