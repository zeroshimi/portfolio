import os
from os.path import join, dirname
from dotenv import load_dotenv

load_dotenv(verbose=True)

path = str(dirname(__file__)).replace("/setting","")
dotenv_path = join(path, '.env')
load_dotenv(dotenv_path)

class Cors:
    origins = {
        os.environ.get("FRONT_END_URL")
    }
