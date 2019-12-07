<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Establecimiento extends Model
{
    protected $table = "establecimientos";

    protected $fillable = ['nombreResp', 'email', 'nombreEst', 'direccion', 'cp', 'tfno', 'horarioAp', 'horarioC', 'latitud', 'longitud', 'estado'];
}