<?php

namespace App\Http\Controllers;
use App\historialReserva;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class historialReservaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $historial = historialReserva::all();
        $respuesta = Response::json($historial, 200);
        return $respuesta;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = json_decode($request->getContent(), true);

        $historial = new historialReserva();
        $historial->tipo = $data[0]["tipo"];
        $historial->dni = $data[0]["dni"];
        $historial->titulo = $data[0]["titulo"];
        $historial->idL = $data[0]["idL"];
        $historial->idUsu = $data[0]["idUsu"];
        $historial->fecha = $data[0]["fecha"];
        $historial->nombreEst = $data[0]["nombreEst"];
        $historial->incidencia = $data[0]["incidencia"];
        $historial->incidenciaActiva = $data[0]["incidenciaActiva"];
        $historial->save();
        return json_encode("success");
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $historial = historialReserva::find($id);
        return json_encode($historial);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        try{
            $data = json_decode($request->getContent(), true);
            $historial = historialReserva::find($data[0]);
            $historial->incidenciaActiva = $data[1];
            // var_dump($historial->incidenciaActiva);
            $historial->save();
            return json_encode("success");
        }catch (\Exception $e){
            return $e;
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
