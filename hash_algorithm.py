from PIL import Image
import imagehash
import base64
from io import BytesIO




def getImagePHash(base64_data):
    binary_data = base64.b64decode(base64_data)
    img_data = BytesIO(binary_data)
    img = Image.open(img_data)
    hash = imagehash.phash(img,hash_size=16)
    return str(hash)

def hash_similarity(hash1,hash2):
    lenth = len(hash1)
    sml_num = 0.0;
    for i in range(lenth):
        if(hash1[i]==hash2[i]):
            sml_num=sml_num+1.0
    sml_rate = sml_num/lenth
    return sml_rate


def test():
    path1 = 'D:imgtest/a.jpg'
    path2 = 'D:imgtest/duibidu.jpg'
    img1 = Image.open(path1)
    img2 = Image.open(path2)
    hash1 = imagehash.phash(img1,hash_size=16)
    hash2 = imagehash.phash(img2,hash_size=16)
    smlr = hash_similarity(str(hash1),str(hash2))
    print(smlr)

