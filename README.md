# Create a new virtual environment:

   ```bash
   $ python -m venv webapp-venv
   $ # Linux:
   $ . webapp-venv/bin/activate
   $ # Windows:
   $ #. webapp-venv/Scripts/Activate
   ```

# Install requirements
```bash
$ pip install -r requirements.txt
```

# Executing examples
```bash
$ python examples/001.quickstart.py
$ python examples/002.suggest_animal_names.py
$ python examples/003.says_this_is_a_test.py
$ python examples/004.filter-data.py
$ python examples/005.filter-people-by-location.py
$ python examples/006.filter-people-by-friends.py
```

# Executing application
```bash
$ flask --app main run
```