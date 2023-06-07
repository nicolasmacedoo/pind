import { Autocomplete, TextField } from '@mui/material'
import { Container } from './styles'
import { Controller, useForm } from 'react-hook-form'

type FormValues = {
  movie: string
}

export function Compras() {
  const { handleSubmit, control } = useForm<FormValues>()

  return (
    <Container>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <Controller
          name="movie"
          control={control}
          render={({ field }) => {
            const { onChange, value } = field
            return (
              <Autocomplete
                value={
                  value
                    ? top100Films.find((movie) => value === movie.year) ?? null
                    : null
                }
                getOptionLabel={(option) => option.label}
                onChange={(_, newValue) => {
                  onChange(newValue ? newValue.year : null)
                }}
                options={top100Films}
                id="combo-box-demo"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Movie"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#7C7C8A',
                        },
                        '&:hover fieldset': {
                          borderColor: '#323238',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#015F43',
                        },
                        '& input': {
                          color: '#7C7C8A',
                        },
                      },
                      '& label.Mui-focused': {
                        color: '#7C7C8A',
                      },
                      '& label': {
                        color: '#7C7C8A',
                      },
                    }}
                  />
                )}
              />
            )
          }}
        />
        <button type="submit">Enviar</button>
      </form>
    </Container>
  )
}

const top100Films = [
  { label: 'The Shawshank Redemption', year: '1994' },
  { label: 'The Godfather', year: '1972' },
  { label: 'The Godfather: Part II', year: '1974' },
  { label: 'The Dark Knight', year: '2008' },
  { label: '12 Angry Men', year: '1957' },
  { label: "Schindler's List", year: '1993' },
  { label: 'Pulp Fiction', year: '1994' },
  {
    label: 'The Lord of the Rings: The Return of the King',
    year: '2003',
  },
]
