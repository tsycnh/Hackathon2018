from PIL import Image
import imagehash
import base64
from io import BytesIO
import cv2
import json

def get_Surf_Value(image):
    surf = cv2.xfeatures2d.SURF_create(400)
    kp1, des1 = surf.detectAndCompute(image,None)
    return des1

def getImageAllHash(base64_data):
    binary_data = base64.b64decode(base64_data)
    img_data = BytesIO(binary_data)
    img = Image.open(img_data)
    phash = imagehash.phash(img,hash_size=8)
    ahash = imagehash.average_hash(img)
    dhash = imagehash.dhash(img)
    whash = imagehash.whash(img,image_scale=64)
    all_hash = {'phash':str(phash),'ahash':str(ahash),'dhash':str(dhash),'whash':str(whash)}
    json_hash = json.dumps(all_hash)
    return json_hash

def getImagePHash(base64_data):
    binary_data = base64.b64decode(base64_data)
    img_data = BytesIO(binary_data)
    img = Image.open(img_data)
    hash = imagehash.phash(img,hash_size=16)
    return hash
def hash_all_similarity(j_hash1,j_hash2):
    json_data1 = json.loads(j_hash1)
    json_data2 = json.loads(j_hash2)
    phash_sim = hash_similarity(json_data1["phash"],json_data2["phash"])
    dhash_sim = hash_similarity(json_data1['dhash'], json_data2['dhash'])
    ahash_sim = hash_similarity(json_data1['whash'], json_data2['whash'])
    whash_sim = hash_similarity(json_data1['whash'], json_data2['whash'])
    similars = [phash_sim,dhash_sim,ahash_sim,whash_sim]
    max_sim = max(similars)
    return max_sim



def hash_similarity(hash1,hash2):
    lenth = len(hash1)
    sml_num = 0.0;
    for i in range(lenth):
        if(hash1[i]==hash2[i]):
            sml_num=sml_num+1.0
    sml_rate = sml_num/lenth
    return sml_rate


def test():
    path1 = 'D:imgtest/a2s/a2.jpg'
    path2 = 'D:imgtest/a2s/a2_cut2.jpg'
    # img1 = Image.open(path1)
    # img2 = Image.open(path2)
    # hash1 = imagehash.phash(img1,hash_size=8)
    # hash2 = imagehash.phash(img2,hash_size=8)
    # a = hash_similarity(str(hash1),str(hash2))
    # image = cv2.imread(path1)
    # a = get_Surf_Value(image)
    f = open(path2, 'rb')
    allhash1 = getImageAllHash(base64.b64encode(f.read()))
    f.close()
    f = open(path1, 'rb')
    allhash2 = getImageAllHash(base64.b64encode(f.read()))
    f.close()
    max_sim = hash_all_similarity(allhash1,allhash2)
    print(max_sim)
test()
