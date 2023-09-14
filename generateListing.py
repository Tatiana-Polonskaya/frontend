import os 

def check_filename(filename: str, x: tuple[str]):
    for y in x:
        if y in filename:
            return False
    return True

result_filename = "out.txt"
if os.path.exists(result_filename):
    os.remove(result_filename)

for root, _, files in os.walk("."):
    for file in files:
        filename = (root + os.sep + file)
        if not check_filename(filename, (".git", "node_modules", ".husky")):
            continue
        if os.path.splitext(filename)[1] not in (".ts", ".tsx", ".html", ".css", ".scss"):
            continue
        print("processing:", filename)
        try:
            with open(result_filename, "a", encoding="utf-8") as file:
                file.write("\n\n" +filename + "\n")
                file.write("-"*len(filename))
                file.write("\n")

                with open(filename, "r", encoding="utf-8") as file2:
                    file.write(file2.read())
        except Exception as ex:
            print(filename)
            raise ex