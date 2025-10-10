import bcrypt

def password_hashing(password):

    pwd = password.encode('utf-8')
    salt = bcrypt.gensalt()

    hashed_pwd = bcrypt.hashpw(pwd,salt)

    return hashed_pwd

def password_check(user_pwd,entered_pwd):

    entered_pwd = (entered_pwd).encode('utf-8')

    return bcrypt.checkpw(entered_pwd,user_pwd)
    